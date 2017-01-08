const closePostDialog = () => {
  return {
    type: 'CLOSE_POST_DIALOG',
    postDialog: false
  }
};

const openPostDialog = () => {
  return {
    type: 'OPEN_POST_DIALOG',
    postDialog: true,
    pdLoading: true,
    pdPage: {},
    pdText: "",
    pdDate: {},
    pdTime: {},
    pdValid: false,
    pdPosting: false,
    pdPost: {},
    myPages: [],
    pdScheduled: false,
    pdPageError: false,
    pdTextError: false,
    pdDateError: false,
    pdTimeError: false
  }
};

const myPagesLoaded = (pages) => {
  return {
    type: 'MY_PAGES_LOADED',
    myPages: pages,
    pdLoading: false 
  }
};

const pageSelected = (page) => {
  return {
    type: 'PAGE_SELECTED',
    pdPage: page 
  }
};

const toggleScheduling = (currentVal) => {
  return {
    type: 'TOGGLE_SCHEDULING',
    pdScheduled: !currentVal 
  }
};

const postTextChanged = (text) => {
  return {
    type: 'POST_TEXT_CHANGED',
    pdText: text 
  }
};

const postDateChanged = (date) => {
  return {
    type: 'POST_DATE_CHANGED',
    pdDate: date 
  }
};

const postTimeChanged = (time) => {
  return {
    type: 'POST_TIME_CHANGED',
    pdTime: time 
  }
};

const postFormValidated = (valid) => {
  return {
    type: 'POST_FORM_VALIDATED',
    pdValid: valid 
  }
};

const posting = () => {
  return {
    type: 'POSTING',
    pdPosting: true,
    pdErrorMessage: ""
  }
};

const posted = (post) => {
  return {
    type: 'POSTED',
    pdPost: post,
    postDialog: false,
    pdPosting: false 
  }
}

const postError = (pdErrorMessage) => {
  return {
    type: 'POST_ERROR',
    pdErrorMessage,
    pdPosting: false,
  }
};

const dismissPostError = () => {
  return {
    type: 'DISMISS_POST_ERROR',
    pdErrorMessage: "",
  }
};

const invalidFormError = (pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError) => {
  return {
    type: 'INVALID_FORM_ERROR',
    pdErrorMessage: pdErrorMessage,
    pdPageError,
    pdTextError,
    pdDateError,
    pdTimeError
  }
};

export { closePostDialog, openPostDialog, myPagesLoaded,
    pageSelected, postTextChanged, 
    postDateChanged, postTimeChanged, 
    postFormValidated, posting, posted, toggleScheduling, postError, dismissPostError, invalidFormError };