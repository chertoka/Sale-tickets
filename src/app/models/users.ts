export interface IUser {
  login: string,
  email?: string,
  psw: string,
  cardNumber?: string,
  id: string
}

//данные, которые приходят с сервера
export interface IStatisticUser {
  id: number,
  name: string,
  username: string,
  email: string,
  address: IStatisticUserAddress,
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}
export interface IStatisticUserAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
}

// данные преобразовываем и уже передаем в нашу таблицу
export interface ICustomStatisticUser {
  name: string,
  company: string,
  phone: string,
  id: number,
  city: string,
  street: string
}
