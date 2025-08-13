
from circuitbreaker import circuit
from app.core.config import settings

def gemini_circuit_breaker(func):
    return circuit(
        failure_threshold=settings.CIRCUIT_BREAKER_FAILURE_THRESHOLD,
        recovery_timeout=settings.CIRCUIT_BREAKER_RECOVERY_TIMEOUT,
        expected_exception=Exception,
        name="gemini_api"
    )(func)

def is_circuit_breaker_error(exception: Exception) -> bool:
    return "CircuitBreakerError" in str(type(exception))