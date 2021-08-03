import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class UsersTableMigration1627538037458 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // await queryRunner.createIndex(
    //   'questions',
    //   new TableIndex({
    //     name: 'IDX_QUESTION_NAME',
    //     columnNames: ['name'],
    //   }),
    // );
    //
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'answers',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'uuid',
    //         isPrimary: true,
    //       },
    //       {
    //         name: 'name',
    //         type: 'varchar(255)',
    //       },
    //       {
    //         name: 'created_at',
    //         type: 'timestamp',
    //         default: 'now()',
    //       },
    //     ],
    //   }),
    //   true,
    // );
    //
    // await queryRunner.addColumn(
    //   'answers',
    //   new TableColumn({
    //     name: 'questionId',
    //     type: 'uuid',
    //   }),
    // );
    //
    // await queryRunner.createForeignKey(
    //   'answers',
    //   new TableForeignKey({
    //     columnNames: ['questionId'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'questions',
    //     onDelete: 'CASCADE',
    //   }),
    // );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable('users');
    await queryRunner.dropTable('users');
    // const foreignKey = table.foreignKeys.find(
    //   (fk: TableForeignKey) => fk.columnNames.indexOf('questionId') !== -1,
    // );
    // await queryRunner.dropForeignKey('answers', foreignKey);
    // await queryRunner.dropColumn('answers', 'questionId');
    // await queryRunner.dropTable('answers');
    // await queryRunner.dropIndex('questions', 'IDX_QUESTION_NAME');
    // await queryRunner.dropTable('questions');
  }
}
