import { MongoClient } from 'mongodb'
import { v1 as uuidv1 } from 'uuid'
import { CategoryType } from './models/enums'
import { MONGO_URL, MONGO_NAME, NAME } from './environments'

async function main() {
  console.log('🚀  Server ready')
  const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
  })

  try {
    await client.connect()

    console.log('🌱  Database seeder is running')

    const db = client.db(MONGO_NAME)

    const accounts = [
      {
        _id: '24b143d0-5dcc-11ea-b131-411071cb195a',
        username: 'superadmin',
        password:
          '$2b$10$5g52Kh.NU4dnxBGNFxP/fOg7IA6KA07cZDrMd0qncPezamU6F/Bca',
      },
    ]

    accounts.map(async (item) => {
      await db.collection('accounts').findOneAndUpdate(
        { _id: item._id },
        {
          $set: {
            ...item,
            createdAt: +new Date(),
            updatedAt: +new Date(),
          },
        },
        { upsert: true },
      )
    })

    const users = [
      {
        _id: '24bc8e70-5dcc-11ea-b131-411071cb195a',
        idAccount: '24b143d0-5dcc-11ea-b131-411071cb195a',
        fullName: 'Superadmin',
        isActive: true,
      },
    ]

    users.map(async (item) => {
      await db.collection(`users`).findOneAndUpdate(
        { _id: item._id },
        {
          $set: {
            ...item,
            createdAt: +new Date(),
            updatedAt: +new Date(),
          },
        },
        { upsert: true },
      )
    })

    if (!(await db.collection('categories').count())) {
      const categories: any[] = [
        [CategoryType.TYPE, ['Blend', 'Single Origin']],
        [CategoryType.MAKE, ['Aluminium', 'Compostable', 'PBT']],
        [
          CategoryType.ROASTER,
          [
            'April Coffee Roasters',
            'Colonna Coffee',
            'CRU Kafe',
            'Industry Beans',
            'Littles',
            'Papa Palheta',
            'Roastworks',
            'ST. ALi',
            'The Coffee Academics',
            'The Cupping Room',
            'Volcano Coffee Works',
            'Yardstick Coffee',
          ],
        ],
        [
          CategoryType.FLAVOR,
          [
            'Apple',
            'Apricot',
            'Berries',
            'Black Tea',
            'Blackberry',
            'Blackcurrant',
            'Blood Orange',
            'Brown Sugar',
            'Butterscotch',
            'Cacao Nibs',
            'Cane Sugar',
            'Caramel',
            'Cashew',
            'Chocolate',
            'Chocolate Truffle',
            'Citrus',
            'Cocoa',
            'Dark Chocolate',
            'Dried Fruit',
            'Earl Grey Tea',
            'Earthy',
            'Floral',
            'Fruit Punch',
            'Hazelnut',
            'Herbal',
            'Honeycomb',
            'Jasmine',
            'Lavender',
            'Leather',
            'Lemongrass',
            'Licorice',
            'Lime',
            'Macadamia',
            'Mandarin',
            'Maple Syrup',
            'Melon',
            'Milk Chocolate',
            'Molasses',
            'Nougat',
            'Orange',
            'Passionfruit',
            'Peach',
            'Peanut Butter',
            'Pear',
            'Pecan',
            'Plum',
            'Raspberry',
            'Raspberry Jam',
            'Red Apple',
            'Red Fruit',
            'Red Grape',
            'Rhubarb',
            'Spices',
            'Strawberry',
            'Toffee',
            'Vanilla',
            'Whiskey',
            'White Grape',
          ],
        ],
        [CategoryType.ROAST_LEVEL, ['Dark', 'Light', 'Medium']],
        [
          CategoryType.PROCESSING,
          [
            'Decaf',
            'Honey Processed',
            'Natural',
            'Various',
            'Washed',
            'Wet Hulled',
          ],
        ],
        [
          CategoryType.REGION,
          ['Asia', 'Central America', 'South America', 'Various'],
        ],
        [CategoryType.LOCATION, ['Hongkong', 'Singapore']],
			]
			
			const categoriesToInsert = categories.map(([group, childen]) => childen.map(item => ({
				_id: uuidv1(),
				name: item,
				type: group
			}))).flat()

			await db.collection('categories').insertMany(categoriesToInsert)
    }
    client.close()
    console.log('💤  Server off')
  } catch (err) {
    console.log('❌  Server error', err.stack)
  }
}

main()
