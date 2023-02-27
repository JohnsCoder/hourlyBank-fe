class Cookies {
  private cookie = document.cookie.split("; ").map((e) => e.split("="));
  add(value: string) {
    document.cookie = `loginToken=${value}; expires=${new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    )}; place="/login"; SameSite=strict; Secure";`;
  }

  remove() {
    document.cookie = `loginToken=""; expires=${Date()}`;
  }

  get() {
    return Object.fromEntries(this.cookie);
  }
}

export default Cookies;
