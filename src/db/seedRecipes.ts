import type { Recipe } from './index'

type Meal = 'breakfast' | 'lunch' | 'dinner'

function rc(n:string,cat:string,ml:Meal[],ing:string,min:number,bf:boolean,tag:string):Recipe {
  return {
    name:n, category:cat, mealTypes:ml.join(','), ingredients:ing,
    steps:'', estimatedMinutes:min, babyFriendly:bf, babyNote:bf?'少盐少油版':'',
    tags:tag, isCustom:false, enabled:true
  }
}

export const seedRecipes: Recipe[] = [
  // 宝宝菜 15道
  rc('香菇蒸鸡腿','宝宝菜',['lunch','dinner'],'鸡腿2个,香菇5朵,姜,葱',35,true,'香菇,鸡肉,宝宝'),
  rc('茭白炒肉丝','宝宝菜',['lunch','dinner'],'茭白2根,猪肉丝100g,盐,油',15,true,'茭白,猪肉,宝宝'),
  rc('番茄牛肉','宝宝菜',['lunch','dinner'],'牛肉200g,番茄2个,番茄酱',30,true,'番茄,牛肉,宝宝'),
  rc('虾仁蒸蛋','宝宝菜',['lunch','dinner'],'鸡蛋2个,虾仁50g,温水,盐',15,true,'虾仁,蒸蛋,宝宝'),
  rc('肉末豆腐','宝宝菜',['lunch','dinner'],'嫩豆腐1盒,猪肉末100g,酱油,葱',15,true,'豆腐,肉末,宝宝'),
  rc('清蒸鱼','宝宝菜',['lunch','dinner'],'鲈鱼1条,姜,葱,蒸鱼豉油',20,true,'清蒸,鱼,宝宝'),
  rc('西兰花牛肉','宝宝菜',['lunch','dinner'],'西兰花200g,牛肉150g,盐,油',20,true,'西兰花,牛肉,宝宝'),
  rc('蘑菇炒蛋','宝宝菜',['lunch','dinner'],'蘑菇5朵,鸡蛋3个,盐,油',10,true,'蘑菇,鸡蛋,宝宝'),
  rc('香菇青菜','宝宝菜',['lunch','dinner'],'香菇5朵,青菜300g,蒜,盐',10,true,'香菇,青菜,宝宝'),
  rc('冬瓜肉丸汤','宝宝菜',['lunch','dinner'],'冬瓜300g,猪肉末150g,姜,盐',25,true,'冬瓜,肉丸,汤,宝宝'),
  rc('山药排骨汤','宝宝菜',['lunch','dinner'],'排骨300g,山药1根,姜,盐',70,true,'排骨,山药,汤,宝宝'),
  rc('青菜肉末粥','宝宝菜',['breakfast','lunch'],'大米50g,青菜2棵,猪肉末50g,盐',30,true,'粥,青菜,肉末,宝宝'),
  rc('番茄炒蛋','宝宝菜',['lunch','dinner'],'番茄2个,鸡蛋3个,盐,油,糖',10,true,'番茄,鸡蛋,宝宝'),
  rc('菌菇豆腐汤','宝宝菜',['lunch','dinner'],'嫩豆腐1盒,香菇3朵,蘑菇3朵,葱,盐',15,true,'菌菇,豆腐,汤,宝宝'),
  rc('清蒸鸡腿','宝宝菜',['lunch','dinner'],'鸡腿2个,姜,葱,盐',35,true,'清蒸,鸡肉,宝宝'),

  // 上海家常菜 15道
  rc('红烧肉','上海家常菜',['dinner'],'五花肉500g,酱油,糖,姜,葱,料酒',70,false,'红烧,猪肉,家常'),
  rc('糖醋排骨','上海家常菜',['dinner'],'排骨500g,醋,糖,酱油,料酒,姜',50,false,'糖醋,排骨,家常'),
  rc('番茄牛腩','上海家常菜',['dinner'],'牛腩500g,番茄3个,番茄酱,姜',100,true,'番茄,牛腩,家常'),
  rc('青椒肉丝','上海家常菜',['lunch','dinner'],'青椒3个,猪肉丝150g,盐,油',15,false,'青椒,肉丝,家常'),
  rc('肉末茄子','上海家常菜',['lunch','dinner'],'茄子2根,猪肉末100g,酱油,蒜',20,false,'茄子,肉末,家常'),
  rc('芹菜肉丝','上海家常菜',['lunch','dinner'],'芹菜200g,猪肉丝100g,盐,油',15,false,'芹菜,肉丝,家常'),
  rc('毛豆炒肉丁','上海家常菜',['lunch','dinner'],'毛豆200g,猪肉丁100g,盐,油',20,false,'毛豆,肉丁,家常'),
  rc('雪菜毛豆','上海家常菜',['lunch','dinner'],'雪菜100g,毛豆200g,糖,油',15,false,'雪菜,毛豆,家常'),
  rc('家常豆腐','上海家常菜',['lunch','dinner'],'老豆腐1块,青椒,木耳,酱油',20,true,'豆腐,家常'),
  rc('麻婆豆腐','上海家常菜',['lunch','dinner'],'嫩豆腐1盒,猪肉末50g,豆瓣酱',15,false,'豆腐,微辣,家常'),
  rc('白斩鸡','上海家常菜',['dinner'],'三黄鸡1只,姜,葱,盐',40,false,'白斩鸡,家常'),
  rc('葱油鸡','上海家常菜',['dinner'],'鸡腿2个,葱,姜,盐,油',30,false,'葱油,鸡肉,家常'),
  rc('红烧鲫鱼','上海家常菜',['dinner'],'鲫鱼1条,酱油,姜,葱,料酒',25,false,'红烧,鱼,家常'),
  rc('油面筋塞肉','上海家常菜',['dinner'],'油面筋10个,猪肉末200g,酱油,糖',40,false,'面筋,塞肉,家常'),
  rc('罗宋汤','上海家常菜',['dinner'],'牛腩200g,番茄,土豆,胡萝卜,卷心菜,洋葱',100,true,'罗宋汤,家常'),

  // 早餐/主食 10道
  rc('小馄饨','早餐主食',['breakfast','lunch'],'小馄饨皮20张,猪肉末100g,紫菜,虾皮',20,true,'小馄饨,早餐,宝宝'),
  rc('馄饨','早餐主食',['lunch','dinner'],'馄饨皮30张,猪肉末150g,青菜,盐',30,true,'馄饨,主食'),
  rc('蒸蛋','早餐主食',['breakfast'],'鸡蛋2个,温水,盐,酱油',15,true,'蒸蛋,早餐,宝宝'),
  rc('鸡蛋饼','早餐主食',['breakfast'],'面粉100g,鸡蛋2个,葱,盐,油',15,true,'鸡蛋饼,早餐'),
  rc('小米粥','早餐主食',['breakfast'],'小米50g,水',25,true,'粥,早餐,宝宝'),
  rc('青菜粥','早餐主食',['breakfast'],'大米50g,青菜2棵,盐',25,true,'粥,青菜,早餐,宝宝'),
  rc('白粥配鸡蛋','早餐主食',['breakfast'],'大米50g,鸡蛋1个',25,true,'粥,鸡蛋,早餐'),
  rc('葱油拌面','早餐主食',['breakfast','lunch'],'面条200g,葱,酱油,油,糖',15,false,'拌面,早餐'),
  rc('汤面','早餐主食',['lunch','dinner'],'面条200g,青菜,鸡蛋,盐,高汤',15,false,'汤面,主食'),
  rc('炒饭','早餐主食',['lunch','dinner'],'米饭2碗,鸡蛋2个,胡萝卜,豌豆,盐',15,false,'炒饭,主食'),
]

export const SEED_RECIPE_COUNT = seedRecipes.length
console.log('Seed recipes:', SEED_RECIPE_COUNT)
