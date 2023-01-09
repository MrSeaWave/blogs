---
title: rust 安装
author: Sea
toc: true
date: 2021-01-20 10:20:16
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/yYqer8_image-20210120105733511.png
tags: [Install, Rust]
categories: [技术]
---

Rust 通常被称为 rust-lang。Rust 是一个由 Mozilla Research 赞助的通用的、多范式、现代的、跨平台和开源系统编程语言。

它旨在实现安全性、速度和并发性等目标。

Rust 在语法上与 C++ 相似，但它的设计者希望它在保持性能的同时提供更好的内存安全性。

Rust 目前在许多组织中使用，例如 Firefox、Chef、Dropbox、Oracle、GNOME 等。

<!-- more -->

## 如何在 Mac 中安装 Rust 语言？

我们可以通过多种方式安装 Rust，但以下是[官方推荐的安装方式](https://www.rust-lang.org/tools/install)。

```bash install
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /Users/xmly/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory located at:

  /Users/xmly/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /Users/xmly/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /Users/xmly/.profile
  /Users/xmly/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-apple-darwin
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>

info: profile set to 'default'
info: default host triple is x86_64-apple-darwin
info: syncing channel updates for 'stable-x86_64-apple-darwin'
info: latest update on 2020-12-31, rust version 1.49.0 (e1884a8e3 2020-12-29)
info: downloading component 'cargo'
  4.1 MiB /   4.1 MiB (100 %)   3.3 MiB/s in  1s ETA:  0s
info: downloading component 'clippy'
info: downloading component 'rust-docs'
 13.8 MiB /  13.8 MiB (100 %)   2.3 MiB/s in  6s ETA:  0s
info: downloading component 'rust-std'
 21.1 MiB /  21.1 MiB (100 %)   2.3 MiB/s in  9s ETA:  0s
info: downloading component 'rustc'
 50.8 MiB /  50.8 MiB (100 %)   2.3 MiB/s in 22s ETA:  0s
info: downloading component 'rustfmt'
info: installing component 'cargo'
info: using up to 500.0 MiB of RAM to unpack components
info: installing component 'clippy'
info: installing component 'rust-docs'
 13.8 MiB /  13.8 MiB (100 %)   3.4 MiB/s in  4s ETA:  0s
info: installing component 'rust-std'
 21.1 MiB /  21.1 MiB (100 %)   3.6 MiB/s in  5s ETA:  0s
info: installing component 'rustc'
 50.8 MiB /  50.8 MiB (100 %)   7.4 MiB/s in  7s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-apple-darwin'

  stable-x86_64-apple-darwin installed - rustc 1.49.0 (e1884a8e3 2020-12-29)


Rust is installed now. Great!

To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH
environment variable. Next time you log in this will be done
automatically.

To configure your current shell, run:
source $HOME/.cargo/env
```

运行以下命令配置当前 shell。

```bash source
$ source $HOME/.cargo/env
```

运行以下命令验证已安装的 Rust 版本。

```bash rust version
$ rustc --version
rustc 1.49.0 (e1884a8e3 2020-12-29)
```

## 如何测试 Rust 编程语言

安装 Rust 后，请按照以下步骤检查 Rust 语言是否正常工作。

创建一个文件并添加以下代码并保存。确保 Rust 文件始终以 .rs 扩展名结尾。

```bash index
$ vim index.rs
fn main() {
 println!("Hello World");
}
```

运行以下命令编译 rust 代码。

```bash rust
$ rustc index.rs
```

上面的命令将在同一目录中创建一个可执行的 Rust 程序。

```bash ls
$ ls -lh
total 760
-rwxr-xr-x  1 xmly  staff   375K  1 20 10:45 index
-rw-r--r--  1 xmly  staff    41B  1 20 10:36 index.rs
```

运行 Rust 可执行文件得到输出。

```bash run
$ ./index
Hello World
```

好了！正常工作了。

## 参考链接

- [Rustup for managing Rust versions](https://doc.rust-lang.org/edition-guide/rust-2018/rustup-for-managing-rust-versions.html#rustup-for-managing-rust-versions)

- [rust](https://www.rust-lang.org/tools/install)
