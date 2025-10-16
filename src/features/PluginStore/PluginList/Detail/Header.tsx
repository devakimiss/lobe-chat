'use client';

import { Avatar, Collapse, Icon, Text } from '@lobehub/ui';
import { createStyles, useResponsive } from 'antd-style';
import { DotIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import PublishedTime from '@/components/PublishedTime';

import { useDetailContext } from './DetailProvider';
import TagList from './TagList';

const useStyles = createStyles(({ css, token }) => {
  return {
    desc: css`
      color: ${token.colorTextSecondary};
    `,
    time: css`
      font-size: 12px;
      color: ${token.colorTextDescription};
    `,
    version: css`
      font-family: ${token.fontFamilyCode};
      font-size: 13px;
    `,
  };
});

const Header = memo<{ inModal?: boolean; mobile?: boolean }>(({ mobile: isMobile, inModal }) => {
  const { author, identifier, createdAt, avatar, title, tags, description } = useDetailContext();
  const { styles, theme } = useStyles();
  const { mobile = isMobile } = useResponsive();
  const { t } = useTranslation('discover');

  return (
    <Flexbox gap={24}>
      <Flexbox align={'flex-start'} gap={16} horizontal width={'100%'}>
        <Avatar avatar={avatar} size={mobile ? 48 : 64} />
        <Flexbox
          flex={1}
          gap={4}
          style={{
            overflow: 'hidden',
          }}
        >
          <Flexbox
            align={'center'}
            gap={8}
            horizontal
            justify={'space-between'}
            style={{
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Flexbox
              align={'center'}
              flex={1}
              gap={12}
              horizontal
              style={{
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Text
                as={'h1'}
                ellipsis
                style={{ fontSize: inModal ? 20 : mobile ? 18 : 24, margin: 0 }}
                title={identifier}
              >
                {title}
              </Text>
            </Flexbox>
          </Flexbox>
          <Flexbox horizontal justify={'space-between'}>
            <Flexbox>
              <Flexbox align={'center'} gap={4} horizontal>
                {author && <span>{author}</span>}
                <Icon icon={DotIcon} />
                <PublishedTime
                  className={styles.time}
                  date={createdAt as string}
                  template={'MMM DD, YYYY'}
                />
              </Flexbox>
              {tags && <TagList tags={tags} />}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>

      <Collapse
        defaultActiveKey={['summary']}
        expandIconPosition={'end'}
        items={[
          {
            children: description,
            key: 'summary',
            label: t('plugins.details.summary.title'),
          },
        ]}
        variant={'outlined'}
      />
    </Flexbox>
  );
});

export default Header;
