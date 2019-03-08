import {
  TableBaseConfig, NumberFieldInfo, TextFieldInfo,
  SelectFieldInfo, SelectModel, DateFieldInfo, MultipleFieldInfo,
  CheckboxFieldInfo, RadioGroupFieldInfo, ContainerFieldInfo, DynamicFieldInfo
} from 'projects/table-toolkit/src/';

export const config: TableBaseConfig = {
  fields: [
    new TextFieldInfo('Name', 'name').required().withDefaultValue('Vlad'),
    new NumberFieldInfo('Age', 'age'),
    new DateFieldInfo('Hire Day', 'hireDate'),
    new SelectFieldInfo('Gender', 'gender')
      .withOptions([
        new SelectModel('Male', 'MALE'),
        new SelectModel('Female', 'FEMALE'),
      ]),
    new MultipleFieldInfo('Departments', 'departments')
      .withOptions([
        new SelectModel('IT', 'it'),
        new SelectModel('HR', 'hr'),
        new SelectModel('Legal', 'LAW'),
        new SelectModel('Accounting', 'ACC')
      ]).withNaLabel('none'),
    new CheckboxFieldInfo('Pension', 'pension')
      .withTrueLabel('Pensioneer')
      .withfalseLabel('Employee'),
    new RadioGroupFieldInfo('Title', 'title')
      .withOptions([
        new SelectModel('Mr.', 'mr'),
        new SelectModel('Mrs.', 'mrs'),
        new SelectModel('Ms.', 'ms')
      ]),
    new ContainerFieldInfo('More Info', 'moreInfo')
      .withInnerFields([
        new DateFieldInfo('Birthday', 'birthday'),
        new CheckboxFieldInfo('First Job', 'isFirstJob')
      ]),
    new ContainerFieldInfo('Additional Info', 'additionalInfo')
      .withInnerFields([
        new DateFieldInfo('Marriage Date', 'marriageDate'),
        new CheckboxFieldInfo('Married?', 'married')
      ]).unflattened(),
    new DynamicFieldInfo('Work history', 'history')
      .withInnerFields([
        new TextFieldInfo('Employer', 'employer'),
        new DateFieldInfo('Hire Date', 'hireDate')
      ])
  ],
  showActionsColumn: true,
  showEdit: true,
  showAdd: true,
  showDelete: true,
  showPaginator: true
};

export const data: Array<User> = [
  {
    id: 1,
    name: 'John Doe',
    age: 25,
    gender: 'MALE',
    departments: [],
    pension: true,
    title: 'mr',
    hireDate: new Date(2018, 2, 16),
    birthday: new Date(1993, 8, 29),
    isFirstJob: false,
    additionalInfo: {
      marriageDate: new Date(2018, 9, 27),
      married: true
    },
    history: [{
      employer: 'JTI',
      hireDate: new Date(2018, 8, 1)
    }]
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 31,
    gender: 'FEMALE',
    departments: ['it', 'hr'],
    pension: false,
    title: 'mrs',
    hireDate: new Date(2015, 3, 2),
    birthday: new Date(1987, 7, 16),
    isFirstJob: true,
    additionalInfo: {
      marriageDate: new Date(2018, 9, 27),
      married: true
    },
    history: [],
  }
];

export interface User {
  id: number;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  departments: Array<string>;
  pension: boolean;
  title: 'ms' | 'mr' | 'mrs';
  hireDate: Date;
  birthday: Date;
  isFirstJob: boolean;
  history: Array<HireHistory>;
  additionalInfo: {
    married: boolean,
    marriageDate: Date
  };
}

export interface HireHistory {
  employer: string;
  hireDate: Date;
}
