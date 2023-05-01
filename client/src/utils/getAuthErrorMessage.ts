const getAuthErrorMessage = (e: any, failedSentence?: string) => {
  let errorMessage: string;

  switch (e.code) {
    case 'auth/user-not-found':
      errorMessage = `An account with that email address doesn't exist.`;
      break;

    case 'auth/wrong-password':
      errorMessage = 'Your password is incorrect.';
      break;

    case 'auth/invalid-email':
      errorMessage = 'Your email is incorrect.';
      break;

    case 'auth/email-already-in-use':
      errorMessage = 'This email is already taken.';
      break;

    case 'auth/network-request-failed':
      errorMessage = 'Network connection is unstable. Please try again.';
      break;

    default:
      errorMessage = `${failedSentence || 'Something went wrong. Please try again.'} (${e.code}).`;
      break;
  }

  return errorMessage;
};

export default getAuthErrorMessage;
