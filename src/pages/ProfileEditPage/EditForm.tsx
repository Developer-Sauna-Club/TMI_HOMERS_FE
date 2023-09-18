import { FormEventHandler } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { HiPencil } from 'react-icons/hi';
import MainButton from '@/components/MainButton';

const textareaAutosize: FormEventHandler<HTMLTextAreaElement> = (event) => {
  const target = event.target as HTMLTextAreaElement;
  target.style.height = 'auto';
  target.style.height = `${target.scrollHeight}px`;
};

const EditForm = () => {
  return (
    <div className="flex justify-center">
      <form className="p-8 flex flex-col gap-3 max-w-sm w-full">
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-wall-street font-Cafe24Surround font-bold">
            프로필 사진
          </label>
          <div className="relative w-32 h-32 rounded-full bg-profile-bg self-center mb-6 border border-tertiory-gray text-primary-black">
            <BiSolidUser className="w-24 h-24 translate-x-4 translate-y-4" />
            <label
              htmlFor="image"
              className="absolute right-1 bottom-1 p-1 rounded-full bg-profile-bg border border-tertiory-gray"
            >
              <HiPencil className="w-4 h-4" />
            </label>
            <input type="file" accept="image/*" className="hidden" id="image" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-wall-street font-Cafe24Surround font-bold">닉네임</label>
          <input className="max-w-sm  w-full  p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir" />
          <small className="self-end font-Cafe24SurroundAir text-sm font-light">7 / 10</small>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-wall-street font-Cafe24Surround font-bold">자기소개</label>
          <textarea
            className="max-w-sm  w-full  p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir"
            onChange={textareaAutosize}
          />
          <small className="self-end font-Cafe24SurroundAir text-sm font-light">0 / 30</small>
        </div>
        <div className="flex flex-col items-center mt-5 p-5 gap-5">
          <MainButton label="비밀번호 변경하기" mode="outlined" />
          <MainButton label="프로필 수정" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
