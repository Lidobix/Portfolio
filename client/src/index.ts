console.log('coucou');
const bouton: HTMLButtonElement | null = document.querySelector('button');

const callApi = async (): Promise<void> => {
  try {
    const result: any = fetch(`http://127.0.0.1:1234/api`, {
      method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
    }).then((r) => {
      console.log(r);
    });

    const jsonResult: any = await result.json();
    console.log(jsonResult);
    // jsonResult = await resultValue.json();
  } catch (error) {
    console.log(error);
  }
};

bouton?.addEventListener('click', callApi);
