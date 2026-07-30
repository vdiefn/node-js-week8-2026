/**
 * 任務 4：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require('./data-source')


/** 清空：被 FK 指著的表最後刪（先刪 COURSE，再 USER / SKILL）。
 *  不用 clear()（TRUNCATE 會被 FK 擋）、不用 delete({})（TypeORM 拒絕空條件）。 */
async function clearAll() {
  for (const name of ['Course', 'User', 'Skill']) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  const skillRepo = dataSource.getRepository("Skill")
  const userRepo = dataSource.getRepository("User")
  const courseRepo = dataSource.getRepository("Course")

  // ======================================================================
  // TODO：依照任務內容的規格寫入資料
  //   1. SKILL 三筆：重訓、瑜珈、飛輪
  //   2. USER 兩位教練，role 都為 'COACH'：
  //      海格教練（coach1@livefit.tw）、小美教練（coach2@livefit.tw）
  //   3. COURSE 四堂課：肌力入門班、週末飛輪、晨間瑜珈、核心特訓
  //      每堂課記得接上教練跟技能
  //      關聯的接法：user / skill 直接放前面存好的教練、技能物件
  //     （TypeORM 會自動取出它的 id 填進外鍵），寫法範例：
  //      courseRepo.save({ name: '...', user: 教練物件, skill: 技能物件 })
  // ======================================================================
  const newSkill = skillRepo.create([
    {name: "重訓"},
    {name: "瑜珈"},
    {name: "飛輪"}
  ])
  await skillRepo.save(newSkill)

  const newUser = userRepo.create([
    {name: "海格", email:"coach1@livefit.tw",role:"COACH"},
    {name: "小美", email:"coach2@livefit.tw",role:"COACH"}
  ])
  await userRepo.save(newUser)

  await courseRepo.save([
    {
    name: "肌力入門班",
    description: "適合初學者的肌力訓練課程",
    start_at: new Date(),
    end_at: new Date(),
    max_participants: 10,
    user: newUser[0],
    skill: newSkill[0],
  },
  {
    name: "週末飛輪",
    description: "高燃脂心肺飛輪體驗",
    start_at: new Date(),
    end_at: new Date(),
    max_participants: 15,
    user: newUser[0],
    skill: newSkill[2],
  },
  {
    name: "晨間瑜珈",
    description: "舒緩身心的晨間伸展瑜珈",
    start_at: new Date(),
    end_at: new Date(),
    max_participants: 12,
    user: newUser[1],
    skill: newSkill[1],
  },
  {
    name: "核心特訓",
    description: "強化腹肌與深層核心肌群",
    start_at: new Date(),
    end_at: new Date(),
    max_participants: 8,
    user: newUser[1],
    skill: newSkill[1],
  },
  ])

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
