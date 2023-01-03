/**
 * Magic Mirror
 * Server side part of module.
 */

// provided dependency (MM2)
// FIXME help TS recognize node_helper otherwise production build won't work
import * as NodeHelper from 'node_helper';
import * as NodeHelperImpl from './helper_impl';

module.exports = NodeHelper.create(NodeHelperImpl);
