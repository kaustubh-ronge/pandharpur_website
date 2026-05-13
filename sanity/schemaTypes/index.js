import bhaktaniwas from "./bhaktaniwas";
import hotel from "./hotel";
import kirtankar from "./kirtankar";
import otherAttraction from "./otherAttraction";
import otherAttractionCategory from "./otherAttractionCategory";
import ownerContact from './ownerContact';
import restaurant from "./restaurants";
import temple from "./temples";
import travel from "./travels";

export const schema = {
  types: [hotel, bhaktaniwas, temple, restaurant, travel,otherAttractionCategory, otherAttraction, ownerContact, kirtankar ],
}
