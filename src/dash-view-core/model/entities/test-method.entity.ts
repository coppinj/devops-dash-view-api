import { BooleanColumn, EntityWithSchema, IntColumn, ManyToOne } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { TestClass } from './test-class.entity';

@EntityWithSchema('public.test_methods')
export class TestMethod extends AbstractEntity<TestMethod> {
  @IntColumn('row', false)
    row: number;

  @IntColumn('rows', false)
    rows: number;

  @BooleanColumn('validated', false)
    validated: boolean;

  @ManyToOne(() => TestMethod, () => TestClass, 'test_class_id', 'testClassID', false)
    testClass: TestClass;
  testClassID: number;
}
