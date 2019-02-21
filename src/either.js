const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  chain: f => f(x),
  inspect: x => `Right ${x}`
});

const Left = x => ({
  map: f => Left(x),
  chain: f => Left(x),
  fold: (f, g) => f(x),
  inspect: x => `Left ${x}`
});

const fromNullable = x => (x != null ? Right(x) : Left(null));

function _showPage(current_user) {
  if (current_user) {
    return renderPage(current_user);
  } else {
    return showLogin();
  }
}

function showPage(current_user) {
  return fromNullable(current_user).fold(showLogin, renderPage);
}

const _getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences);
  } else {
    return defaultPrefs;
  }
};

const getPrefs = user =>
  (user.premium ? Right(user) : Left("not premium"))
    .map(u => u.preferences)
    .fold(() => console.log("default"), x => console.log(x));

const _streetName = user => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
  }
  return "no street";
};

const streetName = user =>
  fromNullable(user.address)
    .chain(address => fromNullable(address.street))
    .map(street => street.name)
    .fold(() => console.log("no street"), name => console.log(name));

const _concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0];
  return found ? ys : ys.concat(x);
};

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0]).fold(() => ys.concat(x), () => ys);

const tryCatch = (f) => {
    try {
        Right(f())
    } catch(err) {
        Left(err)
    }
}

const _wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    } catch (e) {}

    return example;
  }
};


const readFile = x => tryCatch(() => fs.readFileSync(x))
const wrapExamples = example => 
    fromNullable(example.previewPath)
        .chain(readFile)
        .fold(
            () => example,
            ex => Object.assign({}, example, {preview: ex})
        )
