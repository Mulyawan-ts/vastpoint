import duckdb
from app.config.database import DuckDBManager


class TrendQuery:
    def execute(self, time_range: str = "all") -> list[dict[str, object]]:
        con: duckdb.DuckDBPyConnection = DuckDBManager.get_connection()
        try:
            where_clause = ""
            if time_range == "1h":
                where_clause = "WHERE timestamp >= datetime('now', '-1 hour')"
            elif time_range == "24h":
                where_clause = "WHERE timestamp >= datetime('now', '-24 hours')"
            elif time_range == "7d":
                where_clause = "WHERE timestamp >= datetime('now', '-7 days')"

            query = f"""
                SELECT
                    sensor_id,
                    ROUND(AVG(water_level), 2) as avg_water_level,
                    MAX(water_level) as max_water_level,
                    COUNT(*) as total_records
                FROM go_db.water_telemetries
                {where_clause}
                GROUP BY sensor_id
            """
            return con.execute(query).df().to_dict(orient="records")
        except Exception as e:
            print(f"[DuckDB Trend Query Error] {e}")
            return []
        finally:
            con.close()
