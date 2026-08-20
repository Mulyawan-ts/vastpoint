import os
from pathlib import Path
import duckdb


class DuckDBManager:
    @classmethod
    def get_connection(cls) -> duckdb.DuckDBPyConnection:
        con = duckdb.connect(database=":memory:")
        con.execute("INSTALL sqlite; LOAD sqlite;")

        # Path relatif presisi dari lokasi file database.py
        current_dir = Path(__file__).resolve().parent
        db_path = current_dir.parents[2] / "vastpoint.db"

        if db_path.exists():
            con.execute(f"ATTACH '{db_path.as_posix()}' AS go_db (TYPE SQLITE);")
        else:
            print(f"[DuckDB Warning] DB tidak ditemukan di: {db_path}")

        return con
