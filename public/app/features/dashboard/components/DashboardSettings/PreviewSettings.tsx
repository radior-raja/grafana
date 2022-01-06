import React, { PureComponent } from 'react';
import { CollapsableSection, FileUpload } from '@grafana/ui';
import { getThumbnailURL } from 'app/features/search/components/SearchCard';

interface Props {
  uid: string;
}

interface State {}

export class PreviewSettings extends PureComponent<Props, State> {
  state: State = {};

  doUpload = (evt: EventTarget & HTMLInputElement, isLight?: boolean) => {
    const file = evt?.files && evt.files[0];
    if (!file) {
      console.log('NOPE!', evt);
      return;
    }

    const url = getThumbnailURL(this.props.uid, isLight);
    const formData = new FormData();
    formData.append('file', file);

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        location.reload(); //HACK
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    const { uid } = this.props;
    const imgstyle = { maxWidth: 300, maxHeight: 300 };
    return (
      <CollapsableSection label="Preview settings" isOpen={true}>
        <div>DUMMY UI just so we have an upload button!</div>
        <table cellSpacing="4">
          <thead>
            <tr>
              <td>[DARK]</td>
              <td>[LIGHT]</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={getThumbnailURL(uid, false)} style={imgstyle} />
              </td>
              <td>
                <img src={getThumbnailURL(uid, true)} style={imgstyle} />
              </td>
            </tr>
            <tr>
              <td>
                <FileUpload
                  accept="image/png, image/webp"
                  onFileUpload={({ currentTarget }) => this.doUpload(currentTarget, false)}
                >
                  Upload dark
                </FileUpload>
              </td>
              <td>
                <FileUpload
                  accept="image/png, image/webp"
                  onFileUpload={({ currentTarget }) => this.doUpload(currentTarget, true)}
                >
                  Upload light
                </FileUpload>
              </td>
            </tr>
          </tbody>
        </table>
      </CollapsableSection>
    );
  }
}
