### Front-End App Games Board

#### Welcome

At Admix we’re always looking to find ways to enable our users to discover games and other Admix inventory. That inventory however needs management! Below you will find information regarding two endpoints and a series of designs that need to be created to manage that data! Please read the follow instruction carefully and create a prototype that not only matches the designs provided but shows off your skills at data management. 

[The Designs](https://www.figma.com/file/LR9mb7UU2Uzkn5GmrppjQP/%5Bjob%5D-Front-end-assignment?node-id=0%3A1)

[ProtoType](https://www.figma.com/proto/LR9mb7UU2Uzkn5GmrppjQP/%5Bjob%5D-Front-end-assignment?node-id=1%3A1691&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A1691)

---
### Requirements:

#### Key Requirements:

1. Use Typescript.
2. Styles in the Figma match style's in the created prototype.
3. Apps visible are pulled from the available API.
4. On the Edit Page allow for Update using the PUT endpoint provided
5. Search Bar MUST have an Autocomplete aspect to it, whether that is App Title, or App Id

Make use of a bootstrap libraries conventions for validation and messaging.

[Create-react-app](https://github.com/facebook/create-react-app )
[NextJS](https://nextjs.org/)
[Bootstrap-Lib](https://mui.com/)
[TypeScript](https://www.typescriptlang.org/)

---
### API Spec

| Method    | Header            | URL                   |Body           |Response           |
|:----------|:-----------------|:----------------------|--------------:|------------------:|
| POST      | admix-api-key: 2b7123aa-1a2f- 4230-9275-7131d0de3fca |`https://services.admixplay.com/challenge-v1` |Body | Response |
| PUT      | admix-api-key: 2b7123aa-1a2f- 4230-9275-7131d0de3fca |`https://services.admixplay.com/challenge-v1/enrich/update/{id}` |UpdateBody | EnrichedApp |

```
curl -H "admix-api-key: 2b7123aa-1a2f-4230-9275-7131d0de3fca" \ -X POST \
-d '{"pageIndex":0,"pageSize":5,"filters":[{"name":"updatedAt", "value":"2020-07-25T22:01:57.366Z" , "operator": "gt"}],"sorts": [{"field" : "updatedAt" , "desc" : true}]}' \ https://services.admixplay.com/challenge-v1/fetch
```

**Request Body:**
```
Body {
  "pageIndex": number,
  "pageSize": number,
  "operator": "and" | "or",
  "filters": Filter[],
  "sorts": Sort[]
}
Filter {
  "name": keyof App,
  "value": App[keyof App] | Array<App[keyof App]>,
  "operator": "gt" | "lt" | "eq" | "like" | "in"
}
Sort {
  "field": keyof App,
  "desc": boolean
}
App {
  "title": string,
  "tags": string[],
  "avails": number,
  "score": number,
  "platform": "mobile" | "vr" | "ar",
  "geos": string[],
  "storeCategories": string,
  "updatedAt": Date | isoString,
  "createdAt": Date | isoString
}
```

**Pagination:**

*pageIndex*: Indicate the index of the page you would like to be returned for a pagination of size pageSize. 
*pageSize*: Indicate how many results you would like displayed on the response out of the total entities matched.

---

##### Example 1: Grab the first five results (first page of five results)
```
{
  "pageIndex": 0,
  "pageSize": 5
}
```

**Filtering:**
*operator:* This is the top level operator that defines the relationship between the provided filters array. If you provide multiple
filters, you can either narrow down the results by using the and operator or broaden them up by using or and additively matching
against each filter.
*filters*: This is an array of one or multiple filters. The name field has to be given a valid key of App. The value field has to be given
the target data to be filtered by and must match the corresponding App field type. The nested filter operator field decides what kind of matching to be done on the target field based on your value input. gt, lt, and eq stand for > (greater than), < (less than), and == (equality) operators. like will cause the value to be used as a regular expression to match against the database. in requires that value be an array, and matches all elements in the database that are present in the array.

---

##### Example 2: Grab all apps that either have avails greater than 15K OR have a score greater than 4

```
{
  "pageIndex": 0,
  "pageSize": 5,
  "operator": "or",
  "filters": [
    {
      "name": "avails",
      "value": 15000,
      "operator": "gt"
    }, {
      "name": "score",
      "value": 4,
      "operator": "gt"
} ]
}
```

**Sorting:**
*sorts*: The field field must be a valid key of App. This is the field that the results will be sorted by. The desc field indicates whether you would like the returned data to be ordered in ascending (false) or descending (true) order, lexicographically in the case of a string filter, numerically in the case of a number filter.

---
##### Example 3: Grab “Vegas Crime Simulator 2”, “Monster Truck Racing Hero 3D”, apps that have the word “racing” in the title, or apps with categories that match either “violence” or “action”. Display the second page, with a page size of 10 per response. Sort returned apps by score in descending order.

```
{
  "pageIndex": 1,
  "pageSize": 10,
  "operator": "or",
  "filters": [
    {
      "name": "title",
      "value": ["Vegas Crime Simulator 2", "Monster Truck Racing Hero
3D"],
      "operator": "in"
}, {
      "name": "title",
      "value": "racing",
      "operator": "like"
}, {
      "name": "tags",
      "value": ["violence", "action"],
      "operator": "in"
} ],
"sorts": [ {
      "field": "score",
      "desc": true
    }
] }
```

**Response Body**:

```
Response {
  "totalCount": number,
  "items": AppOutput[],
  "dau": number
}
AppOutput {
  "title": string,
  "tags": string[],
  "platform": "mobile" | "vr" | "ar",
  "googlePlayStoreInfo": StoreInfo,
  "appStoreInfo": StoreInfo,
  "avails": number,
  "score": number,
  "metrics": AppMetrics
  "storeCategories": string,
}
StoreInfo {
  "contentRating": string,
  "genre": string,
  "screenshots": string[]
}
AppMetrics {
  "dau": number,
"mau": number,
  "avgTimePerSession": number,
  "sessions": number
}
```
---
##### Screenshots:

Apps will either have a googlePlayStoreInfo or appStoreInfo key defined. The associated object shape is StoreInfo, inside which you will find an array of screenshots. These are URLs to the image resources.

if isDeleted is false the app is considered published

**Update Enriched App**

```
curl -H "admix-api-key: 2b7123aa-1a2f-4230-9275-7131d0de3fca" \ -X POST \
-d '{ avails: 10001 }' \ https://services.admixplay.com/challenge-v1/enriched/update /5fb3e231f8b0bfb7a0705d3a
```

**Request Body**
```
export class UpdateEnrichedAppDto extends GetByIdDto {
  @IsOptional()
  @IsEnum(EnrichedAppPlatform)
  public platform: EnrichedAppPlatform;
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({
    each: true,
  })
  public geos: string[];
  @IsOptional()
  @IsBoolean()
  public isDeleted: boolean;
  @IsOptional()
  @IsBoolean()
  public featured: boolean;
@IsOptional()
  @ValidateNested()
  @Type(() => AppDemographics)
  public demographics: AppDemographics;
  @IsOptional()
  @ValidateNested()
  @Type(() => AppStore)
  public appStores: AppStore[];
  @IsOptional()
  @ValidateNested()
  @Type(() => AppCalculator)
  public calculator: AppCalculator;
  @IsOptional()
  @ValidateNested()
  @Type(() => AppMetrics)
  public metrics: AppMetrics;
  @IsNumber()
  @IsOptional()
  public avails: number;
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({
    each: true,
  })
  public tags: string[];
}
```
---
#### Object Definitions

[Categories](https://gist.github.com/Ksmike/2ae3ffcc66d0196982ce18c0bb648e38) 
[Countries](https://gist.github.com/Ksmike/ef6ba6f71936072941d760ce607d9321)
