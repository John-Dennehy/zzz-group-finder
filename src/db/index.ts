import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

import config from "@/db/config";
import groups from "@/db/schema/groups";

// create the connection
const connection = connect(config);

const db = drizzle(connection);

export const allGroups = db
  .select({
    id: groups.id,
    name: groups.name,
    description: groups.description,
    address: groups.address,
    postCode: groups.postCode,
    url: groups.url,
    facebook: groups.facebook,
    email: groups.email,
    phone: groups.phone,
    monStart: groups.timeMonStart,
    monEnd: groups.timeMonEnd,
    tueStart: groups.timeTueStart,
    tueEnd: groups.timeTueEnd,
    wedStart: groups.timeWedStart,
    wedEnd: groups.timeWedEnd,
    thuStart: groups.timeThuStart,
    thuEnd: groups.timeThuEnd,
    friStart: groups.timeFriStart,
    friEnd: groups.timeFriEnd,
    satStart: groups.timeSatStart,
    satEnd: groups.timeSatEnd,
    sunStart: groups.timeSunStart,
    sunEnd: groups.timeSunEnd,
    logoUrl: groups.logoUrl,
    active: groups.active,
    verified: groups.verifiedAt,
  })
  .from(groups);
