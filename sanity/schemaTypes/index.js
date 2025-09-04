import attractions from "./attractions";
import bhaktaniwas from "./bhaktaniwas";
import categories from "./categories";
import hotel from "./hotel";
import restaurant from "./restaurants";
import temple from "./temples";
import travel from "./travels";

export const schema = {
  types: [hotel, bhaktaniwas, temple, restaurant, travel, attractions, categories],
}
