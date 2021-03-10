import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { UserRoleEnum } from 'src/constants/enums';
import { CategoryExpert } from 'src/modules/master/category-experts/category-expert.model';
import { GetCategoryExpertResDto } from 'src/modules/master/category-experts/dto/responses/get-category-experts-res.dto';
import { GetCompanyGroupResDto } from 'src/modules/company-groups/dto/responses/get-company-group-res.dto';
import { RoleAssignment } from 'src/modules/role-assignments/models/role-assignment.model';
import { GetUserRoleResDto } from 'src/modules/master/user-roles/dto/responses/get-user-roles-res.dto';
import { UserRole } from 'src/modules/master/user-roles/user-role.model';
import { User } from 'src/modules/users/user.model';
@Exclude()
class GetDefaultRoleAssignmentResDto {
  constructor(roleAssignment: RoleAssignment) {
    const roleAssignmentDataValues: RoleAssignment = roleAssignment['dataValues'];

    this.id = roleAssignmentDataValues.id;
    this.company = new GetCompanyGroupResDto(roleAssignmentDataValues.company);
    this.companyGroup = new GetCompanyGroupResDto(roleAssignmentDataValues.companyGroup);

    const defaultUserRole: UserRole = roleAssignmentDataValues.userRoles.find((userRole: UserRole) => {
      return userRole['RoleAssignmentUserRole'].default === true;
    });

    this.defaultUserRole = new GetUserRoleResDto(defaultUserRole);

    if (this.defaultUserRole.name === UserRoleEnum.categoryExpert) {
      this.categoryExperts = roleAssignmentDataValues.categoryExperts.map((categoryExpert: CategoryExpert) => {
        return new GetCategoryExpertResDto(categoryExpert);
      });
    }
  }

  @ApiProperty()
  @Expose()
  public readonly id: number;

  @ApiProperty({ type: GetCompanyGroupResDto })
  @Expose()
  public readonly company: GetCompanyGroupResDto;

  @ApiProperty({ type: GetCompanyGroupResDto })
  @Expose()
  public readonly companyGroup: GetCompanyGroupResDto;

  @ApiProperty({ type: GetUserRoleResDto })
  @Expose()
  public readonly defaultUserRole: GetUserRoleResDto;

  @ApiProperty({ type: [GetCategoryExpertResDto] })
  @Expose()
  public readonly categoryExperts: GetCategoryExpertResDto[];
}

@Exclude()
export class CheckUserAuthResDto {
  constructor(user: User) {
    const userDataValues: User = user['dataValues'];

    const defaultRoleAssignment: RoleAssignment = userDataValues.roleAssignments.find((roleAssignment: RoleAssignment) => {
      return roleAssignment.userRoles.some((userRole: UserRole) => userRole['RoleAssignmentUserRole'].default === true);
    });

    this.id = userDataValues.id;
    this.email = userDataValues.email;
    this.firstName = userDataValues.firstName;
    this.lastName = userDataValues.lastName;
    this.defaultRoleAssignment = defaultRoleAssignment ? new GetDefaultRoleAssignmentResDto(defaultRoleAssignment) : null;
  }

  @ApiProperty()
  @Expose()
  public readonly id: number;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly firstName: string;

  @ApiProperty()
  @Expose()
  public readonly lastName: string;

  @ApiProperty({ type: GetDefaultRoleAssignmentResDto })
  @Expose()
  public readonly defaultRoleAssignment: GetDefaultRoleAssignmentResDto;
}
