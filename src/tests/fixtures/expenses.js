import moment from "moment";

export default [{
    id: '1',
    description: 'Rent',
    note: '',
    amount: 10000,
    createdAt: 0
}, {
    id: '2',
    description: 'Coffee',
    note: '',
    amount: 50,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Foto',
    note: '',
    amount: 100,
    createdAt: moment(0).add(4, 'days').valueOf()
}]
