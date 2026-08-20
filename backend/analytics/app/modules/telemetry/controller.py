from litestar import Controller, Router, get

from app.modules.telemetry.repository import TelemetryRepository


class TelemetryController(Controller):
    path: str = "/api/analytics/telemetry"

    def __init__(self, owner: Router) -> None:
        super().__init__(owner)
        self.repo: TelemetryRepository = TelemetryRepository()

    @get("/summary")
    async def get_summary(self, range: str = "all") -> dict[str, object]:
        data = self.repo.get_trends(time_range=range)
        return {"status": "success", "range": range, "data": data}
