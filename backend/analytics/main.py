from litestar import Litestar, get
from litestar.config.cors import CORSConfig

from app.modules.telemetry.controller import TelemetryController


@get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


app = Litestar(
    route_handlers=[health_check, TelemetryController],
    cors_config=CORSConfig(allow_origins=["http://localhost:3000"]),
)
