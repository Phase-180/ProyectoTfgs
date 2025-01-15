export interface ITarifaDays {
  id: number;
  iva: number;
  descripcion: string;
  price: number;
  TarifaDays: TarifaDay[];
}

export interface TarifaDay {
  dayInit: Date;
  dayEnd: Date;
}
