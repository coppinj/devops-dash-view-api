import { BooleanColumn, EntityWithSchema, ManyToOne, OneToMany, TextColumn, VarcharColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Pipeline } from './pipeline.entity';
import { TestMethod } from './test-method.entity';

@EntityWithSchema('public.test_classes')
export class TestClass extends AbstractEntity<TestClass> {
  @VarcharColumn('name', true)
    name: string;

  @TextColumn('source_code', false)
    sourceCode: string;

  @BooleanColumn('validated', false)
    validated: boolean;

  @OneToMany(() => TestMethod, x => x.testClass)
    testMethods: TestMethod[];

  @ManyToOne(() => TestClass, () => Pipeline, 'pipeline_id', 'pipelineID', false)
    pipeline: Pipeline;
  pipelineID: number;
}
