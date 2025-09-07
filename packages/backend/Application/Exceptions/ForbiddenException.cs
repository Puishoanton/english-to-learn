namespace EnglishToLearn.Application.Exceptions
{
    public class ForbiddenException(string message): ApiException(message, StatusCodes.Status403Forbidden)
    {
    }
}
