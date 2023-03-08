import { defaultHelpers as helpers, result as runResult } from '../../test/support/index.mjs';
import { SERVER_MAIN_SRC_DIR } from '../generator-constants.mjs';
import { GENERATOR_SPRING_SERVICE } from '../generator-list.mjs';

describe('generator - service', () => {
  describe('creates service without interface', () => {
    before(async () => {
      await helpers.runJHipster(GENERATOR_SPRING_SERVICE).withJHipsterConfig().withArguments(['foo']).withAnswers({
        useInterface: false,
      });
    });

    it('creates service file', () => {
      runResult.assertFile([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`]);
    });

    it('doesnt create interface', () => {
      runResult.assertNoFile([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`]);
    });
  });

  describe('creates service with interface', () => {
    before(async () => {
      await helpers.runJHipster(GENERATOR_SPRING_SERVICE).withJHipsterConfig().withArguments(['foo']).withAnswers({
        useInterface: true,
      });
    });

    it('creates service file', () => {
      runResult.assertFile([
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`,
      ]);
    });
  });

  describe('creates service with --default flag', () => {
    before(async () => {
      await helpers.runJHipster(GENERATOR_SPRING_SERVICE).withJHipsterConfig().withArguments(['foo']).withOptions({ default: true });
    });

    it('creates service file', () => {
      runResult.assertFile([
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`,
      ]);
    });
  });
});
