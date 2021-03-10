import { Module } from '@nestjs/common';
import { CacheModule } from '@scgwedotech/nestjs-cache';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FaqsModule } from './modules/faqs/faqs.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConfigOptions } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { UserTypesModule } from './modules/master/user-types/user-types.module';
import { UserRolesModule } from './modules/master/user-roles/user-roles.module';
import { CompanyGroupsModule } from './modules/company-groups/company-groups.module';
import { IsExistingConstraint } from './validations/is-existing.validation';
import { CategoryExpertsModule } from './modules/master/category-experts/category-experts.module';
import { RoleAssignmentsModule } from './modules/role-assignments/role-assignments.module';
import { IsUniqueConstraint } from './validations/is-unique.validation';
import { UserPermissionsModule } from './modules/master/user-permissions/user-permissions.module';
import { UserRolePermissionsModule } from './modules/master/user-role-permissions/user-role-permissions.module';
import { ForgetPasswordsModule } from './modules/forget-password/forget-passwords.module';
import { RisksModule } from './modules/risks/risks.module';
import { RiskDetailsModule } from './modules/risk-details/risk-details.module';
import { WorkflowStatusesModule } from './modules/master/workflow-statuses/workflow-statuses.module';
import { ImpactTypesModule } from './modules/master/impact-types/impact-types.module';
import { MitigationPlansModule } from './modules/mitigation-plans/mitigation-plans.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { EmailsModule } from './modules/email/emails.module';
import { CategoryImpactsModule } from './modules/master/category-impacts/category-impacts.module';
import { RiskRisksModule } from './modules/risk-risks/risk-risks.module';
import { RiskCategoriesModule } from './modules/master//risk-categories/risk-categories.module';
import { HttpLogsModule } from './modules/http-logs/http-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule,
    SequelizeModule.forRoot({
      ...dbConfigOptions(),
      autoLoadModels: true,
      synchronize: false,
      logging: true,
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    UserTypesModule,
    UserRolesModule,
    CompanyGroupsModule,
    IsExistingConstraint,
    IsUniqueConstraint,
    FaqsModule,
    CategoryExpertsModule,
    RoleAssignmentsModule,
    UserPermissionsModule,
    UserRolePermissionsModule,
    ForgetPasswordsModule,
    RisksModule,
    RiskDetailsModule,
    WorkflowStatusesModule,
    ImpactTypesModule,
    MitigationPlansModule,
    AssessmentsModule,
    EmailsModule,
    CategoryImpactsModule,
    RiskRisksModule,
    RiskCategoriesModule,
    HttpLogsModule,
  ],
})
export class AppModule {}
