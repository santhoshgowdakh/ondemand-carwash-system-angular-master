export class CarModel {
    carId: number;
    userId: number;
    carImage: String;
    carRegistrationNumber: number;
    carLocation: String;
    carColor: String;
    carBrand: String;
    carModel: String;

    constructor() {
        this.carId = 0
        this.userId = 0
        this.carImage = ''
        this.carRegistrationNumber = 0
        this.carLocation = ''
        this.carColor = ''
        this.carBrand = ''
        this.carModel = ''
    }
}