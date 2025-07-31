const { Sequelize, DataTypes } = require('sequelize');

describe('ActivityTracker Model', () => {
  let sequelize;
  let ActivityTracker;
  let CourseOffering;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    // Define a minimal CourseOffering model
    CourseOffering = sequelize.define('courseoffering', {}, { timestamps: false });
    // Define ActivityTracker model (fields only for test)
    ActivityTracker = sequelize.define('activitytracker', {
      week: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      allocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'courseoffering',
          key: 'id'
        }
      },
      attendance: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      formativeOneGrading: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started'
      },
      summativeGrading: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started'
      }
    }, { timestamps: false });
    // Set up association for FK
    ActivityTracker.belongsTo(CourseOffering, { foreignKey: 'allocationId' });
    CourseOffering.hasMany(ActivityTracker, { foreignKey: 'allocationId' });
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a valid activity log with default values', async () => {
    // Create a dummy CourseOffering
    const offering = await Courseoffering.create({});
    const log = await ActivityTracker.create({
      week: 1,
      allocationId: offering.id,
      attendance: [true, false, true]
    });
    expect(log.week).toBe(1);
    expect(log.allocationId).toBe(offering.id);
    expect(Array.isArray(log.attendance)).toBe(true);
    expect(log.formativeOneGrading).toBe('Not Started');
    expect(log.summativeGrading).toBe('Not Started');
  });

  it('should require week and allocationId', async () => {
    await expect(ActivityTracker.create({})).rejects.toThrow();
  });
}); 