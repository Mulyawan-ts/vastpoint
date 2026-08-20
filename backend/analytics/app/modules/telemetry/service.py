from app.modules.telemetry.repository import TelemetryAnalyticsRepository


class TelemetryAnalyticsService:
    def __init__(self):
        self.repository = TelemetryAnalyticsRepository()

    def get_summary_analytics(self) -> dict:
        records = self.repository.get_water_level_trends()

        return {
            "status": "success",
            "total_sensors_analyzed": len(records),
            "data": records,
        }
