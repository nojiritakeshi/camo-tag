# 🥷Camo-tag

camo is a special tag that allows you to freely render only specific tags while leaving child elements intact.

## 💻 Installation

```sh
npm install @camo-tag/react
```

Basically, just install it and use it right away!

## ⚡Features

At present it has the following features.

- is-only
  - By passing true to the is-only attribute, only the `camo` can be erased while leaving the child elements intact.
  - Child elements of `camo` have the same functionality as `camo`, as shown in the following example.

```react
<Camo as="main" :is-only="true">
  <h1>Home</h1>
  <p>Hoge</p>
  <div :is-only="true">
    <h2 style="color: red">Sub Title</h2>
    <TestComponent />
  </div>
</Camo>
```

The final result is as follows.

```react
<h1>Home</h1>
<p>Hoge</p>
<h2 style="color: red">Sub Title</h2>
<TestComponent />
```

- is-all & is-survivor
  - `is-all` removes all child elements.
  - Elements surrounded by `is-survivor` protect against is-all.

```react
<Camo as="main" :is-all="isAll">
  <h1>Home</h1>
  <p>Hoge</p>
  <div :is-survivor="true">
    <h2 style="color: red">Sub Title</h2>
    <TestComponent />
  </div>
</Camo>
```

The final result is as follows.

```react
<div>
  <h2 style="color: red">Sub Title</h2>
  <TestComponent />
</div>
```

## Contributing

Contributions are welcome.

If you find a problem or a feature you would like to see, please write an Issue!

Pull requests are also welcome! Let's build something better together! 🥷

## Licence

The scripts and documentation associated with this project are released under the [MIT License](./LICENCE) .
