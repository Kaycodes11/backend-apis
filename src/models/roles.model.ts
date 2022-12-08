import { Schema, model, HydratedDocument } from "mongoose";

type UserRolesType = keyof typeof UserRole; // "GUEST" | "USER"
enum PermissionStatus {
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  CREATE = "CREATE",
}

type Permissions = {
  [UserRole.USER]: PermissionStatus | PermissionStatus[];
  [UserRole.GUEST]:
    | Exclude<
        PermissionStatus,
        | PermissionStatus.CREATE
        | PermissionStatus.UPDATE
        | PermissionStatus.DELETE
      >
    | Array<
        Exclude<
          PermissionStatus,
          | PermissionStatus.CREATE
          | PermissionStatus.UPDATE
          | PermissionStatus.DELETE
        >
      >;
};

const userPermission: Pick<Permissions, UserRole.USER> = {
  USER: [PermissionStatus.DELETE, PermissionStatus.READ],
};
// const guestPermission : Pick<Permissions, UserRole.GUEST> = {GUEST: [PermissionStatus.READ]}
const guestPermission: Pick<Permissions, UserRole.GUEST> = {
  GUEST: PermissionStatus.READ,
};
enum UserRole {
  GUEST = "GUEST",
  USER = "USER",
}

type PermissionLiteral<T = Permissions, K = keyof T> = K extends keyof T
  ? T[K]
  : null;

type MappedPermission<T> = {
  // GUEST -> USER
  [P in keyof T]: T[P];
};

// const mapped: MappedPermission<Permissions, UserRole.GUEST> = "READ";

interface IUserRole {
  role: UserRole;
  permissions?: PermissionLiteral;
}

const RolesSchema = new Schema<IUserRole>(
  {
    role: { type: String, required: true, default: UserRole.GUEST },
    permissions: {
      type: [String],
      enum: PermissionStatus,
      default: [UserRole.GUEST],
    },
  },
  { timestamps: true }
);

RolesSchema.pre("save", function (next) {
  const role = this["role"] ?? UserRole.GUEST;
  // based on the role set the permission thereafter
  // this.permissions: PermissionLiteral<role> = "";
  // next()
});

const Role = model<IUserRole>("Role", RolesSchema);

export default Role;
