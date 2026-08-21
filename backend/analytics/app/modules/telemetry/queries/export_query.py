import tempfile
from pathlib import Path
import duckdb
from app.config.database import DuckDBManager


class ExportQuery:
    def execute_parquet(self) -> bytes:
        con: duckdb.DuckDBPyConnection = DuckDBManager.get_connection()
        try:
            # Gunakan temporary file untuk menampung file parquet dari DuckDB
            with tempfile.NamedTemporaryFile(suffix=".parquet", delete=False) as tmp:
                tmp_path = Path(tmp.name)

            query = f"""
                COPY (
                    SELECT
                        id,
                        sensor_id,
                        water_level,
                        timestamp
                    FROM go_db.water_telemetries
                    ORDER BY timestamp DESC
                ) TO '{tmp_path.as_posix()}' (FORMAT PARQUET, COMPRESSION 'SNAPPY');
            """
            con.execute(query)

            # Baca binary data dari temporary file
            data = tmp_path.read_bytes()
            tmp_path.unlink(missing_ok=True)  # Hapus file sementara
            return data
        except Exception as e:
            print(f"[DuckDB Export Error] {e}")
            return b""
        finally:
            con.close()
