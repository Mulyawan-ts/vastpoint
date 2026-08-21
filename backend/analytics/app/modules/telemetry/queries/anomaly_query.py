import duckdb
from app.config.database import DuckDBManager


class AnomalyQuery:
    def execute(self, threshold_z: float = 2.0) -> list[dict[str, object]]:
        con: duckdb.DuckDBPyConnection = DuckDBManager.get_connection()
        try:
            query = f"""
                WITH stats AS (
                    SELECT
                        id,
                        sensor_id,
                        water_level,
                        timestamp,
                        AVG(water_level) OVER (PARTITION BY sensor_id) as avg_level,
                        STDDEV_SAMP(water_level) OVER (PARTITION BY sensor_id) as std_level
                    FROM go_db.water_telemetries
                ),
                calculated AS (
                    SELECT
                        id,
                        sensor_id,
                        water_level,
                        timestamp,
                        avg_level,
                        std_level,
                        CASE
                            WHEN std_level IS NULL OR std_level = 0 THEN 0.0
                            ELSE ABS(water_level - avg_level) / std_level
                        END as z_score
                    FROM stats
                )
                SELECT
                    id,
                    sensor_id,
                    ROUND(water_level, 2) as water_level,
                    ROUND(avg_level, 2) as expected_avg,
                    ROUND(z_score, 2) as z_score,
                    timestamp
                FROM calculated
                WHERE z_score >= {threshold_z}
                ORDER BY timestamp DESC
                LIMIT 20;
            """
            return con.execute(query).df().to_dict(orient="records")
        except Exception as e:
            print(f"[DuckDB Anomaly Query Error] {e}")
            return []
        finally:
            con.close()
