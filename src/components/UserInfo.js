export default class UserInfo {
  constructor({ profileName, profileActivity, avatar}) {
    this._name = profileName;
    this._activity = profileActivity;
    this._avatar = avatar;
  }

  getUserInfo() {
    const info = {
      profileName: this._name.textContent,
      profileActivity: this._activity.textContent,
      avatar: this._avatar.src
    };
    return info;
  }

  setUserInfo = (info) => {
    //this._name.textContent = info[this._inputsNames.profileName];
    //this._activity.textContent = info[this._inputsNames.profileActivity];
    this._name.textContent = info.name;
    this._activity.textContent = info.about;
    this._avatar.src = info.avatar;

  };
}
