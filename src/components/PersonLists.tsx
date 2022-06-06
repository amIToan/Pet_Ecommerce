type PersonListProp = {
  name: {
    first: string;
    last: string;
  }[];
};

const PersonLists = ({ name }: PersonListProp) => {
  return (
    <div>
      {name?.length > 0 &&
        name.map((item) => (
          <h2>
            {item.first}
            {item.last}
          </h2>
        ))}
    </div>
  );
};

export default PersonLists;
