import { PipeTransform, Injectable } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export class ExtractFieldsPipe implements PipeTransform {
  transform(info: GraphQLResolveInfo): string[] {
    return this.extractTopLevelFields(info);
  }

  private extractTopLevelFields(info: GraphQLResolveInfo): string[] {
    const fields = new Set<string>();

    const fieldNode = info.fieldNodes[0];

    if (fieldNode.selectionSet) {
      fieldNode.selectionSet.selections.forEach((selection) => {
        if (selection.kind === 'Field') {
          fields.add(selection.name.value);
        }
      });
    }

    return Array.from(fields);
  }
}
