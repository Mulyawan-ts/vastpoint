from app.modules.telemetry.queries.anomaly_query import AnomalyQuery
from app.modules.telemetry.queries.export_query import ExportQuery
from app.modules.telemetry.queries.trend_query import TrendQuery


class TelemetryService:
    def __init__(self) -> None:
        self.trend_query = TrendQuery()
        self.anomaly_query = AnomalyQuery()
        self.export_query = ExportQuery()

    def fetch_trends(self, time_range: str = "all") -> list[dict[str, object]]:
        return self.trend_query.execute(time_range)

    def fetch_anomalies(self, threshold: float = 2.0) -> list[dict[str, object]]:
        return self.anomaly_query.execute(threshold_z=threshold)

    def export_data(() -> bytes:
        return self.export_query.execute_parquet()
