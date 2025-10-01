import User from "./user.model";
import Equipment from "./equipment.model";

const setupAssociations = () => {
  User.hasMany(Equipment, {
    foreignKey: "userId",
    as: "equipments",
  });

  Equipment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default setupAssociations;
