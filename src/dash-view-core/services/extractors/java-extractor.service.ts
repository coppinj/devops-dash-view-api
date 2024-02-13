import { Injectable, NotImplementedException, ServiceUnavailableException } from '@nestjs/common';
import Parser from 'tree-sitter';
import Java from 'tree-sitter-java';
import { AbstractExtractorService, TestClass, TestMethod } from '../../model';
import { ExtractorService } from '../extractor.service';
import { TestMethodService } from '../test-method.service';

@Injectable()
export class JavaExtractorService extends AbstractExtractorService {
  constructor(
    extractor: ExtractorService,
    private readonly testMethodService: TestMethodService,
  ) {
    super(extractor, 'java');
  }

  protected async _parse(testClass: TestClass): Promise<TestClass> {
    let javaMethods: IMethodDeclaration[] | null = null;

    try {
      const tree = this._parser.parse(testClass.sourceCode);

      javaMethods = this.extractMethods(tree.rootNode, testClass.sourceCode);
    }
    catch (e) {
      throw e;
    }

    if (!javaMethods) {
      return null;
    }

    const testMethods: TestMethod[] = [];

    for (const javaMethod of javaMethods) {
      const testMethod = new TestMethod();

      testMethod.row = javaMethod.rowStart;
      testMethod.rows = javaMethod.rowEnd - javaMethod.rowStart;
      testMethod.validated = false;
      testMethod.testClass = testClass;

      testMethods.push(testMethod);
    }

    await this.testMethodService.getRepository().save(testMethods);

    return testClass;
  }

  protected _setLanguage(): void {
    this._parser.setLanguage(Java);
  }

  private extractMethods(node: Parser.SyntaxNode, sourceCode: string): IMethodDeclaration[] {
    let methods: IMethodDeclaration[] = [];

    if (node.type === 'method_declaration') {
      const methodNameNode = node.children.find(n => n.type === 'identifier');
      const methodBodyNode = node.children.find(n => n.type === 'block');

      if (methodNameNode && methodBodyNode) {
        methods.push({
          name: methodNameNode.text,
          content: sourceCode.substring(methodBodyNode.startIndex, methodBodyNode.endIndex),
          rowStart: node.startPosition.row,
          rowEnd: node.endPosition.row,
        });
      }
    }

    node.children.forEach((child) => {
      methods = methods.concat(this.extractMethods(child, sourceCode));
    });

    return methods;
  }
}

export interface IMethodDeclaration {
  name: string;
  content: string;
  rowStart: number;
  rowEnd: number;
}