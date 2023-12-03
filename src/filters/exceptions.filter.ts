import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

import { env } from '@modules/config/env';

@Catch()
export class GqlApolloErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(GqlApolloErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (gqlHost.getType<GqlContextType>() === 'graphql') {
      if (exception instanceof ApolloError) {
        throw exception;
      }

      this.logger.error(
        'GraphQL Error',
        exception instanceof Error ? exception.stack : String(exception),
      );

      if (env.isDev) {
        const errorMessage =
          exception instanceof Error ? exception.message : 'Unknown error';
        throw new ApolloError(
          `Development Error: ${errorMessage}`,
          'INTERNAL_SERVER_ERROR',
        );
      }
      throw new ApolloError('Something went wrong', 'INTERNAL_SERVER_ERROR');
    }

    throw exception;
  }
}
