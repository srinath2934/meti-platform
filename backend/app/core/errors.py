from fastapi import HTTPException, status


class METIException(HTTPException):
    def __init__(self, status_code: int, code: str, message: str, details: dict = None):
        super().__init__(
            status_code=status_code,
            detail={
                "code": code,
                "message": message,
                "details": details or {}
            }
        )


class EntityNotFoundException(METIException):
    def __init__(self, entity_name: str, entity_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            code="ENTITY_NOT_FOUND",
            message=f"{entity_name} with id '{entity_id}' not found."
        )


class AttemptExpiredException(METIException):
    def __init__(self, attempt_id: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="ATTEMPT_EXPIRED",
            message=f"Assessment attempt '{attempt_id}' has expired. No further submissions are allowed."
        )


class AttemptLockedException(METIException):
    def __init__(self, attempt_id: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="ATTEMPT_LOCKED",
            message=f"Assessment attempt '{attempt_id}' has already been submitted and locked."
        )


class ValidationRuleException(METIException):
    def __init__(self, message: str, details: dict = None):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            code="VALIDATION_FAILED",
            message=message,
            details=details
        )
