from litestar import Controller, Response, get
from app.modules.telemetry.service import TelemetryService


class TelemetryController(Controller):
    path = "/api/v1/analytics/telemetry"

    @get("/trends")
    async def get_trends(self, time_range: str = "all") -> dict[str, object]:
        service = TelemetryService()
        data = service.fetch_trends(time_range)
        return {"status": "success", "data": data}

    @get("/anomalies")
    async def get_anomalies(self, threshold: float = 2.0) -> dict[str, object]:
        service = TelemetryService()
        data = service.fetch_anomalies(threshold=threshold)
        return {"status": "success", "threshold_z": threshold, "total": len(data), "data": data}

    @get("/export/parquet")
    async def export_parquet(self) -> Response[bytes]:
        """Endpoint untuk mengunduh dataset telemetri lengkap dalam format Parquet"""
        service = TelemetryService()
        file_bytes = service.export_data()

        return Response(
            content=file_bytes,
            media_type="application/octet-stream",
            headers={
                "Content-Disposition": 'attachment; filename="telemetry_data.parquet"'
            },
        )
