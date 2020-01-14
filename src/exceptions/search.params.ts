import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParams {
  recommendedage: number;
  countrylist: string;
  gamename: string;
  gameprice: number;
  releasedate: Date;
  }

export interface SearchParamsa {
  gameid: number;
  userid: number;

}

export interface SearchParamsb {
  country: string;
  age: number;

}

export interface SearchParamsWithError {
  data: SearchParams;
  message: string;
}

export interface SearchParamsWithErrora {
  data: SearchParamsa;
  message: string;
}

export interface SearchParamsWithErrorb {
  data: SearchParamsb;
  message: string;
}
