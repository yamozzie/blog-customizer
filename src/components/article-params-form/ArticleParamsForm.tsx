import clsx from 'clsx';
import { useState, FormEvent } from 'react';

import { ArrowButton } from '../../ui/arrow-button/ArrowButton';
import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (field: string) => {
		return (value: OptionType) => {
			setFormState((currentState) => ({
				...currentState,
				[field]: value,
			}));
		};
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		setAppState(formState);
	};

	const handleReset = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		setFormState(defaultArticleState);
		setAppState(defaultArticleState)
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpened}
				onClick={() => setIsOpened((currentIsOpened) => !currentIsOpened)}
			/>
			<div
				onClick={() => setIsOpened(false)}
				className={clsx(styles.overlay, isOpened && styles.overlay_open)}></div>
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить 'htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
