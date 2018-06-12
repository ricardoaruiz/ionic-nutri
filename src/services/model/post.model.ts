import { Deserializable } from "./deserializable.model";

export class Post implements Deserializable {

    public id: number;
    public date: Date;
    public date_gmt: Date;
    public excerpt: {rendered: string, protected: string};
    
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }

}