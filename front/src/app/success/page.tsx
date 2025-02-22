'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setLocalStorage } from '@/lib/localStorage';

export default function Success() {
  const params = useSearchParams();
  const { replace } = useRouter();
  const new_params = new URLSearchParams()

  useEffect(() => {
    if (params.get('name')) {
      const name = params.get('name');
      const email = params.get('email');
      const picture = params.get('picture');
      const uid = params.get('uid')
      const lid = params.get('lid')
      const first_time = params.get('first') == 'True'

      setLocalStorage('name', name);
      setLocalStorage('email', email);
      setLocalStorage('picture', picture);
      setLocalStorage('uid', uid)
      if (lid)
        setLocalStorage('lid', lid)

      if (first_time) {
        new_params.set('first', 'true')
      } else new_params.set('first', 'false')
    }

    // TODO check if it has lattesID

    replace(`/home?${new_params.toString()}`);
  }, []);

  return <></>;
}
