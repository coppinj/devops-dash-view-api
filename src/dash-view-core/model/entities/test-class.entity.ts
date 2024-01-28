import { BooleanColumn, EntityWithSchema, ManyToOne, TextColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Pipeline } from './pipeline.entity';

@EntityWithSchema('public.test_classes')
export class TestClass extends AbstractEntity<TestClass> {
  @BooleanColumn('scaffolding', false)
    scaffolding: boolean;

  @TextColumn('source_code', false)
    sourceCode: string;

  @BooleanColumn('validated', false)
    validated: boolean;

  @ManyToOne(() => TestClass, () => TestClass, 'scaffolding_class_id', 'scaffoldingClassID', true)
    scaffoldingClass: TestClass;
  scaffoldingClassID: number;

  @ManyToOne(() => TestClass, () => Pipeline, 'pipeline_id', 'pipelineID', false)
    pipeline: Pipeline;
  pipelineID: number;
}
