import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RepositoryApiKeyService } from '../services';

export class PipelineApiKeyGuard implements CanActivate {
  constructor(
    private readonly repositoryApiKeyService: RepositoryApiKeyService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['authorization'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const repository = await this.repositoryApiKeyService.getRepositoryByApiKey(apiKey);

    if (!repository) {
      throw new UnauthorizedException('Invalid API key');
    }

    request.repository = repository;

    return true;
  }
}